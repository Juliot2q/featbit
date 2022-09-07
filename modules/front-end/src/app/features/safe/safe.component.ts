import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IAuthProps } from '@shared/types';
import { IMenuItem } from '@shared/menu/menu';
import { getAuth } from '@shared/utils';
import { UserService } from "@services/user.service";

@Component({
  selector: 'app-safe',
  templateUrl: './safe.component.html',
  styleUrls: ['./safe.component.less']
})
export class SafeComponent implements OnInit, OnDestroy {

  public menus: IMenuItem[] = [];
  public auth: IAuthProps;
  public menuExtended: boolean = true;

  private destory$: Subject<void> = new Subject();

  constructor(
    private userService: UserService,
  ) {
    this.setMenus();
  }

  ngOnInit(): void {
    this.auth = getAuth();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  toggleMenu(extended: boolean) {
    this.menuExtended = extended;
  }

  private setMenus(): void {
    // 菜单 path 和 target 互斥，优先匹配 path

    this.menus = [
      {
        line: true
      },
      {
        title: '组织机构',
        icon: 'icons:icon-org',
        path: '/account-settings'
      },
      {
        line: true
      },
      {
        title: '权限管理',
        icon: 'icons:icon-user-permission',
        path: '/iam/users',
        children: [
          {
            title: '团队',
            icon: '',
            path: '/iam/users'
          },
          {
            title: '组',
            icon: '',
            path: '/iam/groups'
          },
          {
            title: '策略',
            icon: '',
            path: '/iam/policies'
          }
        ]
      }
    ];
  }


  public async logout() {
    await this.userService.doLogoutUser();
  }
}